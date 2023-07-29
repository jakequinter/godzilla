use crate::api::{get_request, parse_json, ApiResult};
use crate::models::transition::Transition;
use crate::models::url::Url;

#[tauri::command]
pub async fn fetch_transitions(
    token: &str,
    jira_instance: String,
    issue_id: String,
) -> ApiResult<Transition> {
    let response = get_request(
        Url::JiraCoreParamsUrl(jira_instance, format!("/issue/{issue_id}/transitions")),
        token,
    )
    .await?;

    let data = parse_json(&response)?;

    Ok(data)
}
