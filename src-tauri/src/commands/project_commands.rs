use crate::api::{get_request, parse_json, ApiResult};
use crate::models::project::Project;
use crate::models::url::Url;

#[tauri::command]
pub async fn fetch_projects(token: &str, jira_instance: &str) -> ApiResult<Vec<Project>> {
    let response = get_request(
        Url::JiraCoreUrl(jira_instance.to_string(), "/project"),
        token,
    )
    .await?;

    let data: Vec<Project> = parse_json(&response)?;

    Ok(data)
}
