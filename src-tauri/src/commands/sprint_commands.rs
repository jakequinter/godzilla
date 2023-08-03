use crate::api::{get_request, parse_json, post_request, ApiResult};
use crate::error::TauriError;
use crate::models::sprint::{Issue, Sprint, SprintValue};
use crate::models::url::Url;

#[tauri::command]
pub async fn fetch_active_sprint(
    token: &str,
    jira_instance: String,
    board_id: u32,
) -> ApiResult<Option<SprintValue>> {
    let response = get_request(
        Url::JiraAgileParamsUrl(
            jira_instance,
            format!("/board/{board_id}/sprint?state=active"),
        ),
        token,
    )
    .await?;

    let data: Sprint = parse_json(&response)?;
    let first_val = data.values.into_iter().next().ok_or_else(|| TauriError {
        message: "No active sprint found".to_string(),
    })?;

    Ok(Some(first_val))
}

#[tauri::command]
pub async fn fetch_active_sprint_issues(
    token: &str,
    jira_instance: String,
    sprint_id: u32,
) -> ApiResult<Issue> {
    let response = get_request(
        Url::JiraCoreParamsUrl(jira_instance, format!("/search?jql=sprint={sprint_id}")),
        token,
    )
    .await?;

    let issues: Issue = serde_json::from_str(&response).map_err(|error| TauriError {
        message: format!("Failed to parse the JSON response: {}", error),
    })?;

    Ok(issues)
}

#[tauri::command]
pub async fn update_issue(
    token: &str,
    jira_instance: String,
    issue_id: String,
    transition_id: String,
) -> ApiResult<()> {
    let body = format!(
        r#"{{
        "transition": {{
        "id": "{}"
    }}
}}"#,
        transition_id
    );

    let (status, data) = post_request(
        Url::JiraCoreParamsUrl(jira_instance, format!("/issue/{issue_id}/transitions")),
        token,
        body,
    )
    .await?;

    if status == 204 {
        return Ok(());
    }

    if data.is_empty() {
        // Handle scenarios where the response is empty or non-JSON
        return Err(TauriError {
            message: "No response received or response is empty".to_string(),
        });
    }

    let _data: serde_json::Value = serde_json::from_str(&data).map_err(|error| TauriError {
        message: format!("Failed to parse the JSON response: {}", error),
    })?;

    Ok(())
}
