use crate::api::{get_request, ApiResult};
use crate::error::TauriError;
use crate::models::url::Url;
use crate::models::user::User;

#[tauri::command]
pub async fn myself(token: &str, jira_instance: &str) -> ApiResult<User> {
    let response = get_request(
        Url::JiraCoreUrl(jira_instance.to_string(), "/myself"),
        token,
    )
    .await?;

    let data: User = serde_json::from_str(&response).map_err(|error| TauriError {
        message: format!("Failed to parse the JSON response: {}", error),
    })?;

    Ok(data)
}
