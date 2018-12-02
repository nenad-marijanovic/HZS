import sqlite3
import uuid

from model.team import Team
from model.team_member import TeamMember


DB_PATH = "C:\\Users\\HP\\Back\\db\\hzs.db"


def _connect():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("PRAGMA foreign_keys = ON;")
    conn.commit()
    return conn


def get_team(team_uuid):
    conn = _connect()  # todo use connection as context manager
    c = conn.cursor()
    query = """SELECT id, name, description, photo_url, team_uuid FROM team WHERE team_uuid=?"""
    c.execute(query, (team_uuid,))
    tim = c.fetchone()
    if tim is None:
        return None
    new_team = Team(id=tim[0], name=tim[1], description=tim[2], photo_url=tim[3], team_uuid=tim[4])
    member_query = """SELECT id, first_name, last_name, email, phone_number, school, city FROM 
    team_member WHERE team_id=?"""
    c.execute(member_query, (new_team.id,))
    members = c.fetchall()
    for member in members:
        new_member = TeamMember(id=member[0], first_name=member[1], last_name=member[2], email=member[3],
                                phone_number=member[4], school=member[5], city=member[6], team=new_team)
        new_team.add_member(new_member)

    conn.commit()
    c.close()
    conn.close()

    return new_team


def get_all_teams():
    conn = _connect()
    c = conn.cursor()
    query = """SELECT id, name, description, photo_url, team_uuid FROM team"""
    c.execute(query)
    results = c.fetchall()
    teams = []
    for t in results:
        new_team = Team(id=t[0], name=t[1], description=t[2], photo_url=t[3], team_uuid=t[4])
        member_query = """SELECT id, first_name, last_name, email, phone_number, school, city FROM 
        team_member WHERE team_id=?"""
        c.execute(member_query, (new_team.id,))
        members = c.fetchall()
        for member in members:
            created_member = TeamMember(id=member[0], first_name=member[1], last_name=member[2], email=member[3],
                                        phone_number=member[4], school=member[5], city=member[6], team=new_team)
            new_team.add_member(created_member)
        teams.append(new_team)
    conn.commit()
    c.close()
    conn.close()
    return teams


def delete_member(team_uuid, member_id):
    conn = _connect()
    c = conn.cursor()
    team_uuid = team_uuid[:-1]
    query = """SELECT id FROM team WHERE team_uuid=?"""
    c.execute(query, (team_uuid,))
    team = c.fetchone()
    if team is None:
        return None
    try:
        with conn:
            team_query = """DELETE FROM team_member WHERE team_id=? AND id=?"""
            status = conn.execute(team_query, (team[0], member_id))
            success = False
            if status.rowcount == 1:
                success = True

        return success
    except sqlite3.Error:
        return False


def get_member(team_uuid, member_id):
    conn = _connect()  # todo use connection as context manager
    c = conn.cursor()
    team_uuid = team_uuid[:-1]
    query = """SELECT id, name, description, photo_url, team_uuid FROM team WHERE team_uuid=?"""
    c.execute(query, (team_uuid,))
    team = c.fetchone()
    if team is None:
        return None
    created_team = Team(id=team[0], name=team[1], description=team[2], photo_url=team[3], team_uuid=team[4])
    member_query = """SELECT first_name, last_name, email, phone_number, school, city FROM team_member WHERE
     team_id=? AND id=?"""
    c.execute(member_query, (team[0], member_id))
    m = c.fetchone()
    if m is None:
        return None
    member = TeamMember(id=member_id, first_name=m[0], last_name=m[1], email=m[2], phone_number=m[3], school=m[4],
                        city=m[4], team=created_team)
    conn.commit()
    c.close()
    conn.close()
    return member


def update_member(data):
    conn = _connect()  # todo use connection as context manager
    c = conn.cursor()
    query = """SELECT id FROM team_member WHERE id=? And team_id=?"""
    c.execute(query, (data['id'], data['team_id']))
    if c.fetchone() is None:
        return None
    query = """UPDATE team_member SET first_name=?, last_name=?, email=?, phone_number=?, school=?, city=? WHERE
     team_id=? AND id=?"""
    c.execute(query, (data['first_name'], data['last_name'], data['email'], data['phone_number'], data['school'],
                      data['city'], data['team_id'], data['id']))
    conn.commit()
    c.close()
    conn.close()
    return data


def create_team(data):
    conn = _connect()  # todo use connection as context manager
    c = conn.cursor()
    team_query = """INSERT INTO team (name, description, photo_url, team_uuid) VALUES (?,?,?,?)"""
    team_uuid = uuid.uuid4()
    c.execute(team_query, (data['name'], data['description'], data['photo_url'], str(team_uuid)))
    team_id = c.lastrowid
    data['id'] = team_id
    data['team_uuid'] = team_uuid
    for member in data['team_members']:
        member_query = """INSERT INTO team_member (first_name, last_name, email, phone_number, school, city, team_id) 
        VALUES (?,?,?,?,?,?,?)"""
        c.execute(member_query,
                  (member['first_name'], member['last_name'], member['email'], member['phone_number'], member['school'],
                   member['city'], team_id))
        member['id'] = c.lastrowid
    conn.commit()
    c.close()
    conn.close()
    return data


def delete_all_team_members(team_id):
    conn = _connect()
    try:
        with conn:
            team_query = """DELETE FROM team_member WHERE team_id=?"""
            status = conn.execute(team_query, (team_id,))
            success = False
            if status.rowcount > 0:
                success = True
            return success
    except sqlite3.Error:
        return False


def update_team(data):
    conn = _connect()
    c = conn.cursor()
    delete_all_team_members(data['id'])
    team_query = """UPDATE team SET name=?, description=?, photo_url=? WHERE team_uuid=?"""
    c.execute(team_query, (data['name'], data['description'], data['photo_url'], data['team_uuid']))
    for member in data['team_members']:
        member_query = """INSERT INTO team_member (first_name, last_name, email, phone_number, school, city, team_id) 
        VALUES (?,?,?,?,?,?,?)"""
        c.execute(member_query,
                  (member['first_name'], member['last_name'], member['email'], member['phone_number'], member['school'],
                   member['city'], data['id']))
        member['id'] = c.lastrowid
    conn.commit()
    c.close()
    conn.close()
    return data


def delete_team(team_uuid):
    conn = _connect()
    try:
        with conn:
            team_query = """DELETE FROM team WHERE team_uuid=?"""
            status = conn.execute(team_query, (team_uuid,))
            success = False
            if status.rowcount == 1:
                success = True
        return success
    except sqlite3.Error:
        return False



