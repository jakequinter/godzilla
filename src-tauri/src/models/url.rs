pub enum Url {
    JiraCoreUrl(String, &'static str),
    JiraCoreParamsUrl(String, String),
    JiraAgileParamsUrl(String, String),
}

impl Url {
    pub fn value(self) -> String {
        match self {
            Url::JiraCoreUrl(jira_instance, path) => {
                format!("https://{jira_instance}.atlassian.net/rest/api/3{path}")
            }
            Url::JiraCoreParamsUrl(jira_instance, path) => {
                format!("https://{jira_instance}.atlassian.net/rest/api/3{path}")
            }
            Url::JiraAgileParamsUrl(jira_instance, path) => {
                format!("https://{jira_instance}.atlassian.net/rest/agile/1.0{path}")
            }
        }
    }
}
