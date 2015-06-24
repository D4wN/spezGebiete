//One Folder with Messages
var Folder = React.createClass({
    getInitialState: function () {
        return {
            hideMessage: false,
            messageList: [],
            folderName: ""
        };
    },
    componentDidMount: function () {
        var self = this;
        self.setState({folderName: self.props.title});
    },
    getMessageList: function () {
        //http://localhost:3000/folder/' + $scope.folderName + '/message
        console.log("get message list: " + this.props.title);

        var url = 'http://localhost:3000/folder/' + this.props.title + '/message';
        var self = this;

        $.getJSON(url, function (result) {
            if (!result || !result.length) {
                return;
            }

            var msgList = result.map(function (p) {
                if (p) {
                    return {
                        id: p._id,
                        text: p._text,
                        subj: p._subj
                    };
                }
            });
            self.setState({messageList: []});
            self.setState({messageList: msgList});
        });
    },
    clickFolderRename: function () {

        var newName = $("#RENAME-" + this.props.title).val();
        //if(newName == null || newName === undefined) return;

        this.props.folderRename(this.props.title, newName);
    },
    clickFolderDelete: function () {
        this.props.folderDelete(this.props.title);
    },
    hideMessage: function () {
        this.setState({hideMessage: !this.state.hideMessage});
        if (!this.state.hideMessage) {
            this.getMessageList()
        }
    },

    render: function () {
        var cls = 'folder ';
        var renameId = "RENAME-" + this.props.title;
        var self = this;

        for (var i = 0; i < this.state.messageList.length; i++) {
            this.state.messageList[i]['folderName'] = this.props.title;
        }

        var msg = this.state.messageList.map(function (p) {
            return <fieldset><Message mail={p.id} parentFolder={p.folderName}
                                      updater={self.getMessageList}></Message><br></br></fieldset>;
        });

        if (!this.state.messageList.length) {
            msg = <div>Loading...</div>
        }

        return (
            <div className={cls}>
                <button onClick={this.hideMessage}>{this.props.title}</button>
                { this.state.hideMessage ?
                    <div>
                        <br></br>
                        <input id={renameId} type="text" placeholder="New Folder Name"></input>
                        <button onClick={this.clickFolderRename}>Rename</button>
                        <br></br>
                        <button onClick={this.clickFolderDelete}>Delete</button>
                        <br></br>
                        <br></br>
                        {{msg}}
                    </div>
                    : null }

            </div>
        );
    }
});

var NewMessage = React.createClass({
    getInitialState: function () {
        return {};
    },

    sendRequest: function () {
        var self = this;

        var chose = null;
        if ($("#CHOSE-" + this.props.title).val().length > 0) {
            chose = $("#CHOSE-" + this.props.title).val();
        } else{
            alert("Please insert Folder Name");
        }

        var msg = $("#MSG-" + this.props.title).val();

        var url = 'http://localhost:3000/newMessage';
        if (chose != null) {
            $.ajax({
                type: "POST",
                url: url,
                //contentType: "application/json",
                data: {
                    "chose": chose,
                    "newText": msg
                },
                success: function (result) {
                    console.log("CREATE MESSAGE SUCCESS: ");
                    console.log(result);

                    $("#MSG-" + self.props.title).val("");
                    $("#CHOSE-" + self.props.title).val("");

                    self.props.updater();
                    //TODO RELOAD FOLDER LIST -- CLEAR INPUTS
                }
            });
        }

    },
    render: function () {
        var cls = "New Message";

        var chose = "CHOSE-" + this.props.title;
        var msg = "MSG-" + this.props.title;

        msg = <div><h1>Create a New Message</h1>
            <br>
                <input id={chose} type="text" placeholder="Folder Name"></input>
            </br>
            <br>
                <textarea id={msg} type="text" placeholder="New Message"></textarea>
            </br>

            <br>
                <button onClick={this.sendRequest}>Make New Message</button>
            </br>
        </div>

        return (
            <div className={cls}>
                {{msg}}
            </div>
        );
    }
});//*/

var Message = React.createClass({
    getInitialState: function () {
        return {
            hideMessage: false,
            data: [],
            loaded: false
        };
    },
    getMessageDetails: function () {
        var url = 'http://localhost:3000/folder/' + this.props.parentFolder + '/message/' + this.props.mail;
        var self = this;

        $.getJSON(url, function (result) {
            console.log(result);
            self.setState({data: result});
            self.setState({loaded: true});
        });
    },
    hideMessage: function () {
        this.setState({hideMessage: !this.state.hideMessage});
        if (!this.state.hideMessage) {
            this.getMessageDetails()
        }
    },
    deleteMessage: function () {
        var self = this;

        //'http://localhost:3000/folder/' + $scope.folderName + '/message/' + val + '/delete').
        var url = 'http://localhost:3000/folder/' + this.props.parentFolder + '/message/' + this.props.mail + '/delete';
        $.ajax({
            type: "DELETE",
            url: url,
            contentType: "application/json",
            //data: {"data": "{}"},
            success: function (result) {
                console.log("DELTE MESSAGE SUCCESS: " + result);
                self.props.updater();
            }
        });
    },
    moveMessage: function () {
        var self = this;

        var moveTo = $("#MOVE-" + this.props.title).val();

        var url = 'http://localhost:3000/folder/' + this.props.parentFolder + '/message/' + this.props.mail;

        $.ajax({
            type: "PUT",
            url: url,
            //contentType: "application/json",
            data: {"_id": moveTo},
            success: function (result) {
                console.log("MOVE MESSAGE SUCCESS: ");
                console.log(result);
                self.props.parentFolder = moveTo;
                self.props.updater();
            }
        });
    },
    render: function () {
        var cls = "Message";

        var msg = null;
        var data = this.state.data;
        var renameId = "MOVE-" + this.props.title;

        if (this.state.loaded) {
            msg = <div>
                SUBJ:{data.subject}<br>Sender:{data.sender}</br><br>Recipients:{data.recipients}</br><br>Text:{data.text}</br>
                <br><input id={renameId} type="text" placeholder="Move To Folder"></input>
                    <button onClick={this.moveMessage}>Move Message</button>
                </br></div>
        }
        return (
            <div className={cls}>
                <h3>ID: {this.props.mail}</h3>
                <button onClick={this.hideMessage}>Details</button>
                <button onClick={this.deleteMessage}>Delete Message</button>
                <br></br>
                { this.state.hideMessage ?
                    <div>
                        Parent: {this.props.parentFolder}<br></br>
                        {{msg}}
                    </div>

                    : null }
            </div>
        );
    }
});//*/


//The whole Folder List
var FolderList = React.createClass({

    getInitialState: function () {
        return {
            folder: [],
            renew: false
        };
    },

    componentDidMount: function () {
        this.getFolderList();
    },
    getFolderList: function () {
        console.log("getFolderList");
        var self = this;
        var url = 'http://localhost:3000/folder';

        $.getJSON(url, function (result) {
            if (!result || !result.length) {
                return;
            }

            var folder = result.map(function (p) {
                if (p) {
                    return {
                        id: p._id,
                        name: p._id
                    };
                }
            });
            self.setState({folder: folder});

        });
    },
    folderClick: function (id) {

        // id holds the ID of the folder that was clicked.
        // Find it in the pictures array, and add it to the favorites

        var folder = this.state.folder;

        for (var i = 0; i < folder.length; i++) {

            if (folder[i].id == id) {

                if (folder[i]) {
                    console.log("clicked: " + folder[i].id);
                    return folder[id];
                }
                break;
            }

        }
        this.setState({folder: folder});

    },
    postFolderRename: function (folder, newName) {
        console.log("RENAME: " + folder + " TO " + newName);
        var self = this;

        //'http://localhost:3000/folder/'+val+'/'+newName
        var url = 'http://localhost:3000/folder/' + folder + '/' + newName;
        /*$.post(url, {}, function(response) {
         console.log(result);

         this.getFolderList();
         }, 'json');*/
        $.ajax({
            type: "PUT",
            url: url,
            contentType: "application/json",
            //data: {"data": "{}"},
            success: function (result) {
                console.log("RENAME SUCCESS: " + result);
                self.getFolderList();
            }
        });

    },
    putFolderDelete: function (folder) {
        console.log("DELETE: " + folder);
        var self = this;

        //'http://localhost:3000/folder/'+val+'/'+newName
        var url = 'http://localhost:3000/folder/delete/' + folder;
        $.ajax({
            type: "DELETE",
            url: url,
            contentType: "application/json",
            //data: {"data": "{}"},
            success: function (result) {
                console.log("DELTE SUCCESS: " + result);
                self.getFolderList();
            }
        });

    },
    render: function () {
        var self = this;

        var folder = this.state.folder.map(function (p) {
            return <div><Folder ref={p.id} title={p.name} onClick={self.folderClick}
                                folderRename={self.postFolderRename} folderDelete={self.putFolderDelete}></Folder>
            </div>;
        });

        return (
            <div>
                <NewMessage updater={this.getFolderList}/>

                <h1>Folder:</h1>

                <div className="folder"> {{folder}} </div>
            </div>

        );
    }
});

//React.render(
//    <NewMessage />, document.getElementById("new")
//);

React.render(
    <FolderList />,
    document.getElementById("folder")
);