use serde::{Deserialize, Serialize};
use crate::error::TauriError;

pub type ApiResult<T, E = TauriError> = Result<T, E>;

#[derive(Debug, Deserialize, Serialize)]
pub struct User {
    #[serde(rename = "accountId")]
    account_id: String,
    #[serde(rename = "displayName")]
    display_name: String,
    #[serde(rename = "emailAddress")]
    email_address: String,
}

pub enum Url {
    WithBaseUrl(String, &'static str),
    WithParams(String),
}

impl Url {
    pub fn value(self) -> String {
        match self {
            Url::WithBaseUrl(jira_instance, path) => format!("https://{jira_instance}.atlassian.net/rest/api/3{path}"),
            Url::WithParams(url) => format!("https://whitespectre.atlassian.net/rest/api/3{}", url),
        }
    }
}
