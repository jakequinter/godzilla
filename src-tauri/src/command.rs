use crate::api::get_request;
use crate::error::TauriError;
use crate::models::{ApiResult, Board, BoardValue, Issue, Project, Sprint, SprintValue, Url, User};

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

#[tauri::command]
pub fn fetch_active_sprint_issues(token: &str, jira_instance: &str, sprint_id: &str) -> ApiResult<Issue> {
    println!("fetch_active_sprint_issues");
    let response = get_request(
        Url::JiraCoreParamsUrl(jira_instance.to_string(), format!("/search?jql=sprint={sprint_id}")),
        token,
    )?;
    let data = serde_json::from_str(&response).unwrap();

    return Ok(data);
}

#[tauri::command]
pub fn fetch_issues(token: &str, jira_instance: &str, account_id: &str) -> ApiResult<Issue> {
    let response = get_request(
        Url::JiraCoreParamsUrl(
            jira_instance.to_string(),
            format!("/search?jql=assignee='{account_id}'+AND+sprint+in+openSprints()"),
        ),
        token,
    )?;
    let data = serde_json::from_str(&response).unwrap();

    return Ok(data);
}
