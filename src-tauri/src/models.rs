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
    WithBaseUrl(&'static str),
    WithParams(String),
}

impl Url {
    pub fn value(self) -> String {
        match self {
            Url::WithBaseUrl(url) => format!("https://whitespectre.atlassian.net/rest/api/3{url}"),
            Url::WithParams(url) => format!("https://whitespectre.atlassian.net/rest/api/3{}", url),
        }
    }
}
