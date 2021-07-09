const shared_data = {
    // username: localStorage.username,
    username: undefined,
    role: undefined,
    user_photo: undefined,
    login(username, response) {
        localStorage.setItem("username", username);
        localStorage.setItem("role", response.role);
        localStorage.setItem("user_photo", response.photo)
        this.username = username;
        this.role = response.role;
        this.user_photo = response.photo;
    },
    logout() {
        console.log("logout");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("user_photo")
        localStorage.removeItem("search")
        this.username = undefined;
        this.role = undefined;
        this.user_photo = undefined;
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
        if (coach.photo_path == null)
            coach.photo_path = 'https://i0.wp.com/www.team360baseball.com/wp-content/uploads/sites/1832/2019/07/profile-placeholder-1.png?resize=385%2C409';
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
        team.coach = team_coach;
        return team;
    }
};

export { shared_data };