use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Transition {
    transitions: Vec<TransitionValue>,
}

#[derive(Deserialize, Serialize)]
struct TransitionValue {
    id: String,
    name: String,
    to: TransitionTo,
}

#[derive(Deserialize, Serialize)]
struct TransitionTo {
    id: String,
}
