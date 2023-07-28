use serde::{Deserialize, Serialize};

pub enum Url {
    JiraCoreUrl(String, &'static str),
    JiraCoreParamsUrl(String, String),
    JiraAgileParamsUrl(String, String),
}

impl Url {
    pub fn value(self) -> String {
        match self {
            Url::JiraCoreUrl(jira_instance, path) => {
                format!("https://{jira_instance}.atlassian.net/rest/api/3{path}")
            }
            Url::JiraCoreParamsUrl(jira_instance, path) => {
                format!("https://{jira_instance}.atlassian.net/rest/api/3{path}")
            }
            Url::JiraAgileParamsUrl(jira_instance, path) => {
                format!("https://{jira_instance}.atlassian.net/rest/agile/1.0{path}")
            }
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct User {
    #[serde(rename = "accountId")]
    account_id: String,
    #[serde(rename = "displayName")]
    display_name: String,
    #[serde(rename = "emailAddress")]
    email_address: Option<String>,
    #[serde(rename = "avatarUrls")]
    avatar_url: AvatarUrl,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct AvatarUrl {
    #[serde(rename = "16x16")]
    avatar_16: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Project {
    id: String,
    key: String,
    name: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Board {
    pub values: Vec<BoardValue>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct BoardValue {
    pub id: u32,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Sprint {
    pub values: Vec<SprintValue>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SprintValue {
    id: u32,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Issue {
    total: u32,
    issues: Vec<SprintIssue>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SprintIssue {
    id: String,
    key: String,
    fields: SprintIssueFields,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SprintIssueFields {
    assignee: Option<User>,
    customfield_10004: Option<f32>,
    summary: String,
    status: SprintIssueStatus,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SprintIssueStatus {
    name: String,
}
