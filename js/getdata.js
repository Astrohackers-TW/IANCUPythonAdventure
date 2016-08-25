$(document).ready(function (){
  var showQuests = $('#show-quests');
  $.ajax({
      url: 'quests.json',
      type: 'GET',
      dataType: 'json',
      success: function(data){
        var questData = '';
        $.each(data, function(i, title, description ) {
          var title = data[i].title;
          var description = data[i].description;
          var j = i + 1;
          if (j==1) {
            var contentShow = ' in';
          } else {
            var contentShow = ' ';
          }
          questData += '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#show-quests" href="#quest';
          questData += j + '">任務 ' + j + ': ' + title + '</a></h4></div><div id="quest' + j + '" class="panel-collapse collapse' + contentShow + '"><div class="panel-body">' + description + '</div></div></div>';
      });
        showQuests.append(questData);
      },
      error: function(){
        alert("任務資料沒有載入!");
      }
  });

  var showAdventurers = $('#adventurers-list');
  $.ajax({
      url: 'adventurers.json',
      type: 'GET',
      dataType: 'json',
      success: function(data){
        var adventurerList = '';
        $.each(data, function(name, info) {
          var avatar = info.avatar;
          var level = info.level;
          adventurerList += '<li class="list-group-item"><button type="button" class="btn btn-link btn-adventurerInfo" data-name="' + name + '" data-toggle="modal" data-target="#adventurerModal"><img src="';
          adventurerList += avatar + '" class="img-rounded" width="32" height="32"> ' + name + ' <span class="badge">等級 ' + level + '</span></button></li>';
      });
        showAdventurers.append(adventurerList);
      },
      error: function(){
        alert("玩家資料沒有載入!");
      }
  });

  var infoModal = $('#adventurerModal');
  $(document).on('click', ".btn-adventurerInfo", function() {
    var name = $(this).data('name');
    $.ajax({
        url: 'adventurers.json',
        type: 'GET',
        dataType: 'json',
        success: function(data){
          var avatar = data[name].avatar;
          var role = data[name].role;
          var level = data[name].level;
          var progress = data[name].progress;
          var progress_percent = data[name].progress_percent;
          var adventurerInfo = '<div class="container-fluid"><div class="row"><div class="col-md-4">';
          adventurerInfo += '<img src="' + avatar + '" class="img-thumbnail" width="180" height="180"></div><div class="col-md-8">';
          adventurerInfo += name + ' (等級 ' + level + ' 的' + role + ' )' + '<hr><p>升級進度條 (再 commit ' + progress + ' 次即可升級): </p>';
          adventurerInfo += '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="';
          adventurerInfo += progress_percent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + progress_percent + '%">' + progress_percent + '%</div></div>';
          adventurerInfo += '</div></div>';
          adventurerInfo += '<hr><div class="row"><div class="col-xs-12"><p>技能:</p> '
          adventurerInfo += '</div></div></div>'
          infoModal.find('.modal-body').html(adventurerInfo);
          modal.modal('show');
        },
        error: function(){
         alert("玩家資料沒有載入!");
       }
     });
  });


});
