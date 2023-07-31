use crate::models::user::User;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Sprint {
    pub values: Vec<SprintValue>,
}

#[derive(Deserialize, Serialize)]
pub struct SprintValue {
    id: u32,
}

#[derive(Deserialize, Serialize)]
pub struct Issue {
    total: u32,
    issues: Vec<SprintIssue>,
}

#[derive(Deserialize, Serialize)]
struct SprintIssue {
    id: String,
    key: String,
    fields: SprintIssueFields,
}

#[derive(Deserialize, Serialize)]
struct SprintIssueFields {
    assignee: Option<User>,
    customfield_10004: Option<f32>,
    summary: String,
    status: SprintIssueStatus,
}

#[derive(Deserialize, Serialize)]
struct SprintIssueStatus {
    id: String,
    name: String,
}
