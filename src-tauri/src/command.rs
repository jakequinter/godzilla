use crate::api::get_request;
use crate::error::TauriError;
use crate::models::{ApiResult, Project, Url, User };

#[tauri::command]
pub fn myself(jira_instance: &str, token: &str) -> ApiResult<User> {
    let response = get_request(Url::WithBaseUrl(jira_instance.to_string(), "/myself"),  token)?;

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
pub fn  fetch_projects(jira_instance: &str, token: &str) -> ApiResult<Vec<Project>> {
    let response = get_request(Url::WithBaseUrl(jira_instance.to_string(), "/project"),  token)?;
    let data = serde_json::from_str(&response).unwrap();

    return Ok(data)
}
