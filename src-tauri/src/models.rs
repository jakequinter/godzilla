use serde::{Deserialize, Serialize};
use crate::error::TauriError;

pub type ApiResult<T, E = TauriError> = Result<T, E>;

pub enum Url {
    JiraCoreUrl(String, &'static str),
    JiraAgileUrl(String, &'static str),
    WithParams(String),
}

impl Url {
    pub fn value(self) -> String {
        match self {
            Url::JiraCoreUrl(jira_instance, path) => format!("https://{jira_instance}.atlassian.net/rest/api/3{path}"),
            Url::JiraAgileUrl(jira_instance, path) => format!("https://{jira_instance}.atlassian.net/rest/agile/1.0{path}"),
            Url::WithParams(url) => format!("https://whitespectre.atlassian.net/rest/api/3{}", url),
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
    email_address: String,
    #[serde(rename = "avatarUrls")]
    avatar_url: AvatarUrl,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct AvatarUrl {
    #[serde(rename = "16x16")]
    avatar_16: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Board {
    values: Vec<BoardValue>,
}

#[derive(Debug, Deserialize, Serialize)]
struct BoardValue {
    id: u32,
    name: String,
}

