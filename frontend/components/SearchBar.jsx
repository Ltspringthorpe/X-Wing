var React = require("react"),
    UserItem = require('./UserItem'),
    UserStore = require('../stores/users'),
    ApiUserUtil = require("../util/api_user_util");

var SearchBar = React.createClass({
  getInitialState:function(){
    return { matches: [] }
  },

  search: function (event) {
    event.preventDefault();
    var string = event.target.form.firstChild.value;
    string = string.split(" ");
    var users = UserStore.all();
    var results = [];
    for (var userIdx = 0; userIdx < users.length; userIdx++) {
      var name = users[userIdx].username.split(" ");
      for (var i = 0; i < name.length; i++) {
        for (var j = 0; j < string.length; j++) {
          if (name[i].toLowerCase() === string[j].toLowerCase()) {
            results.push(users[userIdx]);
          }
        }
      }
    }
    this.setState({ matches: results });
  },

  searchList: function() {
    var list = [];
    {this.state.matches.map(function (user) {
      if (user.id != this.props.currentUser.id) {
        list.push(<UserItem key={user.id} user={user}/>)
      }
    }.bind(this))}
    if (list.length === 0) {
      list.push(<p key={-1} className="search-results">No results</p>)
    }
    return list;
  },

  allUsers: function(event) {
    event.preventDefault();
    var results = UserStore.all();
    this.setState({ matches: results });
  },

  render: function () {
    var list = this.searchList();
    if (this.searchList().length === 0) {
      list = <p></p>
    }
    return (
      <input type="text" name="users[username]"></input>
    );
  }
});

module.exports = SearchBar;