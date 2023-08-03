// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use commands::board_commands::{fetch_board, fetch_board_config};
use commands::project_commands::fetch_projects;
use commands::sprint_commands::{fetch_active_sprint, fetch_active_sprint_issues, update_issue};
use commands::transition_commands::fetch_transitions;
use commands::user_commands::myself;

mod api;
mod error;
mod commands {
    pub mod board_commands;
    pub mod project_commands;
    pub mod sprint_commands;
    pub mod transition_commands;
    pub mod user_commands;
}

mod models {
    pub mod board;
    pub mod project;
    pub mod sprint;
    pub mod transition;
    pub mod url;
    pub mod user;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            fetch_active_sprint,
            fetch_active_sprint_issues,
            fetch_board,
            fetch_board_config,
            fetch_projects,
            fetch_transitions,
            myself,
            update_issue
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
