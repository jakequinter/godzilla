use crate::api::get_request;
use crate::error::TauriError;
use crate::models::{ApiResult, Project, Sprint, SprintValue, Url, User};

#[tauri::command]
pub fn myself(token: &str, jira_instance: &str) -> ApiResult<User> {
    let response = get_request(
        Url::JiraCoreUrl(jira_instance.to_string(), "/myself"),
        token,
    )?;

    if !response.starts_with("{") {
        let error = Err(TauriError {
            message: "Invalid credentials",
        });
        return error;
    }

    let data = serde_json::from_str(&response).unwrap();

    return Ok(data);
}

#[tauri::command]
pub fn fetch_projects(token: &str, jira_instance: &str) -> ApiResult<Vec<Project>> {
    let response = get_request(
        Url::JiraCoreUrl(jira_instance.to_string(), "/project"),
        token,
    )?;
    let data = serde_json::from_str(&response).unwrap();

    return Ok(data);
}

#[tauri::command]
pub fn fetch_board(token: &str, jira_instance: &str, board_id: String) -> ApiResult<SprintValue> {
    let response = get_request(
        Url::JiraAgileParamsUrl(
            jira_instance.to_string(),
            format!("/board?projectKeyOrId={board_id}&state=active"),
        ),
        token,
    )?;
    let data: Sprint = serde_json::from_str(&response).unwrap();
    let first_val = data.values.into_iter().next().unwrap();

    return Ok(first_val);
}
