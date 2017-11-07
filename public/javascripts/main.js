var fanduel = angular.module('fanduel',[]);

fanduel.controller('fanduelCtrl', function($scope,$http) {
    $scope.users = [];
    $scope.weeklyUsers = [];
    $scope.weeklyTotalUsers = [];
    $scope.weeks = [];
    $scope.week = "";
    $scope.playerId = "";
    $scope.initWeek = function(week) {
        $scope.week = week;
        $http.get('/users').then(function(input){
            $scope.weeks = input.data[0];

            if ($scope.week === "undefined")
                $scope.week = $scope.weeks[$scope.weeks.length-1];
            
            input.data.splice(0,1);
            $scope.users = input.data;
            
            $scope.users.forEach(function(user) {
                user.total = {
                    fd:0,
                    lp:0,
                    wins:0
                };
            
                for (var i=1; i <= $scope.week; i++) {
                    if (user['week' + i]){
                        user.total.fd += (Math.round((user['week' + i].fd+ 0.00001) * 100) / 100);
                        user.total.fd = (Math.round((user.total.fd + 0.00001) * 100) / 100);
                        user.total.lp += user['week' + i].lp;
                        user.total.wins = user['week' + i].wins
                    }
                }
            
                $scope.weeklyTotalUsers.push(user);
            
                if (user['week' + $scope.week]){
                    var newUser = {
                        name: user.name,
                        fd: user['week' + $scope.week].fd,
                        lp: user['week' + $scope.week].lp
                    }
                    $scope.weeklyUsers.push(newUser);
                }
            }, this); 
            
            $scope.weeklyUsers.sort(function(a,b){
                return b.lp-a.lp;
            })
            
            $scope.weeklyTotalUsers.sort(function(a,b){
                return b.total.lp-a.total.lp;
            })
        })
    }

    $scope.initPlayer = function(playerId) {
        $scope.playerId = playerId
        $scope.playerData = [];
        if ($scope.playerId === "undefined")
            window.location.href = window.location.origin


        $http.get('/users').then(function(input){
            $scope.weeks = input.data[0];      
            input.data.splice(0,1);
            $scope.users = input.data;

            var thisUser = {};
            
            $scope.users.forEach(function(user) {
                if (user.name === $scope.playerId){
                    thisUser = user
                }
            })

            for (var key in thisUser) {
                if (key.indexOf("week")>-1 && thisUser.hasOwnProperty(key)) {
                    if (thisUser[key].position < 4) {
                        thisUser[key].class = "success";
                    } else if (thisUser[key].position < 11) {
                        thisUser[key].class = "";
                    } else if (thisUser[key].position < 16) {
                        thisUser[key].class = "warning";
                    } else {
                        thisUser[key].class = "danger";
                    }

                    $scope.playerData.push(thisUser[key]);
                }
            }

            thisUser.fd = (Math.round((thisUser.fd+ 0.00001) * 100) / 100);
            $scope.user = thisUser;
            $scope.playerData.sort(function(a,b){
                return a.week-b.week;
            })

        })
    }
})