use crate::api::get_request;
use crate::error::TauriError;
use crate::models::{ApiResult, Board, Url, User };

#[tauri::command]
pub fn myself(jira_instance: &str, token: &str) -> ApiResult<User> {
    let response = get_request(Url::JiraCoreUrl(jira_instance.to_string(), "/myself"),  token)?;

    if !response.starts_with("{") {
        let error = Err(TauriError {
            message: "Invalid credentials",
        });
        return error;
    }

    let data = serde_json::from_str(&response).unwrap();

    return Ok(data)
}

#[tauri::command]
pub fn  fetch_boards(jira_instance: &str, token: &str) -> ApiResult<Board> {
    let response = get_request(Url::JiraAgileUrl(jira_instance.to_string(), "/board"),  token)?;
    let data = serde_json::from_str(&response).unwrap();

    return Ok(data)
}
