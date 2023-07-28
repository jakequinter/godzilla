use crate::api::get_request;
use crate::models::{Board, BoardValue, Issue, Project, Sprint, SprintValue, Url, User};
use anyhow::Result;

#[tauri::command]
pub async fn myself(token: &str, jira_instance: &str) -> Result<User, String> {
    let response = get_request(Url::JiraCoreUrl(jira_instance.to_string(), "/myself"), token).await;

    match response {
        Ok(response) => {
            if !response.starts_with("{") {
                return Err(format!("Failed to fetch user: {}", response));
            }
            let data: User = serde_json::from_str(&response).unwrap();
            return Ok(data);
        }
        Err(e) => {
            return Err(format!("Failed to fetch user: {}", e));
        }
    }
}

#[tauri::command]
pub async fn fetch_projects(token: &str, jira_instance: &str) -> Result<Vec<Project>, String> {
    let response = get_request(Url::JiraCoreUrl(jira_instance.to_string(), "/project"), token).await;

    match response {
        Ok(response) => {
            let data: Vec<Project> = serde_json::from_str(&response).unwrap();
            return Ok(data);
        }
        Err(e) => {
            return Err(format!("Failed to fetch projects: {}", e));
        }
    }
}

#[tauri::command]
pub async fn fetch_board(token: &str, jira_instance: String, project_id: String) -> Result<BoardValue, String> {
    let response = get_request(
        Url::JiraAgileParamsUrl(
            jira_instance.to_string(),
            format!("/board?projectKeyOrId={project_id}&state=active"),
        ),
        token,
    )
    .await;

    match response {
        Ok(response) => {
            let data: Board = serde_json::from_str(&response).unwrap();
            let first_val = data
                .values
                .into_iter()
                .next()
                .unwrap();

            return Ok(first_val);
        }
        Err(e) => {
            return Err(format!("Failed to fetch board: {}", e));
        }
    }
}

#[tauri::command]
pub async fn fetch_active_sprint(
    token: &str,
    jira_instance: String,
    board_id: u32,
) -> Result<Option<SprintValue>, String> {
    let response = get_request(
        Url::JiraAgileParamsUrl(jira_instance, format!("/board/{board_id}/sprint?state=active")),
        token,
    )
    .await;

    match response {
        Ok(response) => {
            let data: Sprint = serde_json::from_str(&response).unwrap();
            if data
                .values
                .len()
                > 0
            {
                let first_val = data
                    .values
                    .into_iter()
                    .next()
                    .unwrap();

                return Ok(Some(first_val));
            }

            return Ok(None);
        }
        Err(e) => {
            return Err(format!("Error: {}", e));
        }
    }
}

#[tauri::command]
pub async fn fetch_active_sprint_issues(
    token: &str,
    jira_instance: String,
    sprint_id: String,
) -> Result<Issue, String> {
    let response = get_request(
        Url::JiraCoreParamsUrl(jira_instance, format!("/search?jql=sprint={sprint_id}")),
        token,
    )
    .await;

    match response {
        Ok(response) => {
            let issues: Issue = serde_json::from_str(&response).unwrap();
            return Ok(issues);
        }
        Err(e) => {
            return Err(format!("Error: {}", e));
        }
    }
}
