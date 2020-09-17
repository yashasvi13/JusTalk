const users = [];

//join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

//get current user
function currentUser(id) {
  return users.find(user => user.id === id);
}
//user leave
function userLeave(id) {
  return users.filter(user => user.id !== id)[0];
}

//get Room User
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = { userJoin, currentUser, userLeave, getRoomUsers };
