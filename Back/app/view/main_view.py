from flask import jsonify, request, Blueprint

from controller.main_controller import delete_team, create_team, get_team, update_team,  get_all_teams,\
                                update_member, delete_member, get_member

teams = Blueprint('teams', __name__, url_prefix='/teams')


@teams.route('/<string:team_uuid>', methods=['GET', 'PUT', 'DELETE'])
def single_team_view(team_uuid):
    if request.method == 'GET':
        team = get_team(team_uuid)
        if team is None:
            return jsonify({'error': 'team with unique id {} not found'.format(team_uuid)}), 404
        response_body = team.to_dict()
        return jsonify(response_body), 200

    if request.method == 'DELETE':
        success = delete_team(team_uuid)
        if not success:
            return jsonify({'error': 'team with unique id {} not found'.format(team_uuid)}), 404
        return jsonify({}), 204
    if request.method == 'PUT':
        body = request.json
        updated = update_team(body)
        if updated is None:
            return jsonify({'error': 'team with unique id {} not found'.format(team_uuid)}), 404
        return jsonify(updated), 200


@teams.route('/<team_uuid>:<int:member_id>', methods=['GET', 'PUT', 'DELETE'])
def single_member_view(team_uuid, member_id):
    if request.method == 'PUT':
        body = request.json
        print(body)
        updated = update_member(body)
        if updated is None:
            return jsonify({'error': 'member with id {} not found'.format(member_id)}), 404
        return jsonify(updated), 200
    if request.method == 'GET':
        member = get_member(team_uuid, member_id)
        if member is None:
            return jsonify({'error': 'member with id {} not found'.format(member_id)}), 404
        response_body = member.to_dict()
        return jsonify(response_body), 200


@teams.route('/', methods=['POST', 'GET'])
def teams_view():
    if request.method == 'GET':
        all_teams = get_all_teams()
        response_body = [t.to_dict() for t in all_teams]
        return jsonify(response_body), 200
    if request.method == 'POST':
        body = request.json
        created = create_team(body)
        return jsonify(created), 201

