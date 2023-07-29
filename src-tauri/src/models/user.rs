use serde::{Deserialize, Serialize};

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
