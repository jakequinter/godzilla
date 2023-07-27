use crate::api::get_request;
use crate::error::TauriError;
use crate::models::{ApiResult, Board, BoardValue, Project, Sprint, SprintValue, Url, User};

#[tauri::command]
pub fn myself(token: &str, jira_instance: &str) -> ApiResult<User> {
    let response = get_request(Url::JiraCoreUrl(jira_instance.to_string(), "/myself"), token)?;

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
    let response = get_request(Url::JiraCoreUrl(jira_instance.to_string(), "/project"), token)?;
    let data = serde_json::from_str(&response).unwrap();

    return Ok(data);
}

#[tauri::command]
pub fn fetch_board(token: &str, jira_instance: &str, project_id: String) -> ApiResult<BoardValue> {
    let response = get_request(
        Url::JiraAgileParamsUrl(
            jira_instance.to_string(),
            format!("/board?projectKeyOrId={project_id}&state=active"),
        ),
        token,
    )?;
    let data: Board = serde_json::from_str(&response).unwrap();
    let first_val = data.values.into_iter().next().unwrap();

    return Ok(first_val);
}

#[tauri::command]
pub fn fetch_active_sprint(token: &str, jira_instance: &str, board_id: &str) -> ApiResult<Option<SprintValue>> {
    let response = get_request(
        Url::JiraAgileParamsUrl(
            jira_instance.to_string(),
            format!("/board/{board_id}/sprint?state=active"),
        ),
        token,
    )?;
    let data: Sprint = serde_json::from_str(&response).unwrap();
    if data.values.len() > 0 {
        let first_val = data.values.into_iter().next().unwrap();

        return Ok(Some(first_val));
    }

    return Ok(None);
}
