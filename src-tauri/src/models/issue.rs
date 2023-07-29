use crate::models::user::User;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct Issue {
    total: u32,
    issues: Vec<SprintIssue>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SprintIssue {
    id: String,
    key: String,
    fields: SprintIssueFields,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SprintIssueFields {
    assignee: Option<User>,
    customfield_10004: Option<f32>,
    summary: String,
    status: SprintIssueStatus,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SprintIssueStatus {
    name: String,
}
