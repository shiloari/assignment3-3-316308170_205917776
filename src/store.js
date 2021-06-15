const shared_data = {
    // username: localStorage.username,
    username: undefined,
    login(username) {
        localStorage.setItem("username", username);
        this.username = username;
    },
    logout() {
        console.log("logout");
        localStorage.removeItem("username");
        this.username = undefined;
    },
    get_player_full_data(player_id) {
        let all_players = JSON.parse(localStorage.getItem("all_players"));
        let all_teams = JSON.parse(localStorage.getItem("all_teams"));
        const player = all_players.filter(player => player.id == player_id)[0];
        const team = all_teams.filter(team => team.id == player.team_id)[0];
        if (team) {
            player.team_name = team.name;
            player.team_photo = team.logo_path;
            player.team_short_code = team.short_code;
        }
        return player;
    },
    get_coach_full_data(coach_id) {
        let all_coaches = JSON.parse(localStorage.getItem("all_coaches"));
        let all_teams = JSON.parse(localStorage.getItem("all_teams"));
        const coach = all_coaches.filter(coach => coach.id == coach_id)[0];
        const team = all_teams.filter(team => team.id == coach.team_id)[0];
        if (team) {
            coach.team_name = team.name;
            coach.team_photo = team.logo_path;
            coach.team_short_code = team.short_code;
        }
        return coach;
    },
    get_team_full_data(team_id) {
        let all_teams = JSON.parse(localStorage.getItem("all_teams"));
        let all_coaches = JSON.parse(localStorage.getItem("all_coaches"));
        let all_players = JSON.parse(localStorage.getItem("all_players"));
        const team = all_teams.filter(team => team.id == team_id)[0];
        const team_players = all_players.filter(player => player.team_id == team.id);
        const team_coach = all_coaches.filter(coach => coach.team_id == team.id)[0];
        team.players = team_players;
        console.log(team.players)
        team.coach = team_coach;
        return team;
    }
};

export { shared_data };