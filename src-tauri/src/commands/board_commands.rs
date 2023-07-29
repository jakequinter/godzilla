use crate::api::{get_request, parse_json, ApiResult};
use crate::error::TauriError;
use crate::models::board::{Board, BoardColumn, BoardValue};
use crate::models::url::Url;

#[tauri::command]
pub async fn fetch_board(
    token: &str,
    jira_instance: String,
    project_id: String,
) -> ApiResult<Option<BoardValue>> {
    let response = get_request(
        Url::JiraAgileParamsUrl(
            jira_instance.to_string(),
            format!("/board?projectKeyOrId={project_id}&state=active"),
        ),
        token,
    )
    .await?;

    let data: Board = parse_json(&response)?;
    let first_val = data.values.into_iter().next().ok_or_else(|| TauriError {
        message: "No active board found".to_string(),
    })?;

    Ok(Some(first_val))
}

#[tauri::command]
pub async fn fetch_board_config(
    token: &str,
    jira_instance: String,
    board_id: u32,
) -> ApiResult<BoardColumn> {
    let response = get_request(
        Url::JiraAgileParamsUrl(jira_instance, format!("/board/{board_id}/configuration")),
        token,
    )
    .await?;
    let data: BoardColumn = parse_json(&response)?;

    Ok(data)
}
