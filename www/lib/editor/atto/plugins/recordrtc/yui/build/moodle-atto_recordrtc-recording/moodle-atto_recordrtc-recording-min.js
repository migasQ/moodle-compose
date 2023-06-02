YUI.add("moodle-atto_recordrtc-recording",function(r,t){var s,n,e;M.atto_recordrtc=M.atto_recordrtc||{},s=M.atto_recordrtc.commonmodule,n=M.atto_recordrtc.abstractmodule,M.atto_recordrtc.commonmodule={editorScope:null,alertWarning:null,alertDanger:null,player:null,playerDOM:null,startStopBtn:null,uploadBtn:null,countdownSeconds:null,countdownTicker:null,recType:null,stream:null,mediaRecorder:null,chunks:null,blobSize:null,maxUploadSize:null,capture_user_media:function(t,e,o){window.navigator.mediaDevices.getUserMedia(t).then(e)["catch"](o)},handle_data_available:function(t){s.chunks.push(t.data),s.blobSize+=t.data.size,s.blobSize>=s.maxUploadSize&&(window.localStorage.getItem("alerted")?window.localStorage.removeItem("alerted"):(window.localStorage.setItem("alerted","true"),s.startStopBtn.simulate("click"),n.show_alert("nearingmaxsize")),s.chunks.pop())},handle_stop:function(){var t=new window.Blob(s.chunks,{type:s.mediaRecorder.mimeType});s.player.set("srcObject",null),s.player.set("src",window.URL.createObjectURL(t)),s.player.set("muted",!1),s.player.set("controls",!0),s.player.ancestor().ancestor().removeClass("hide"),s.uploadBtn.ancestor().ancestor().removeClass("hide"),s.uploadBtn.set("textContent",M.util.get_string("attachrecording","atto_recordrtc")),s.uploadBtn.set("disabled",!1),s.editorScope.getDialogue().centered(),s.uploadBtn.on("click",function(){0===s.chunks.length?n.show_alert("norecordingfound"):(s.uploadBtn.set("disabled",!0),s.upload_to_server(s.recType,function(t,e){"ended"===t?(s.uploadBtn.set("disabled",!1),s.insert_annotation(s.recType,e)):"upload-failed"===t?(s.uploadBtn.set("disabled",!1),s.uploadBtn.set("textContent",M.util.get_string("uploadfailed","atto_recordrtc")+" "+e)):"upload-failed-404"===t?(s.uploadBtn.set("disabled",!1),s.uploadBtn.set("textContent",M.util.get_string("uploadfailed404","atto_recordrtc"))):"upload-aborted"===t?(s.uploadBtn.set("disabled",!1),s.uploadBtn.set("textContent",M.util.get_string("uploadaborted","atto_recordrtc")+" "+e)):s.uploadBtn.set("textContent",t)}))})},start_recording:function(t,e){var o=n.select_rec_options(t);s.mediaRecorder=new window.MediaRecorder(e,o),s.mediaRecorder.ondataavailable=s.handle_data_available,s.mediaRecorder.onstop=s.handle_stop,s.mediaRecorder.start(1e3),s.player.set("muted",!0),s.countdownSeconds="audio"===t?s.editorScope.get("audiotimelimit"):"video"===t?s.editorScope.get("videotimelimit"):s.editorScope.get("defaulttimelimit"),s.countdownSeconds++,e=M.util.get_string("stoprecording","atto_recordrtc"),s.startStopBtn.setHTML(e+=' (<span id="minutes"></span>:<span id="seconds"></span>)'),s.set_time(),s.countdownTicker=window.setInterval(s.set_time,1e3),s.startStopBtn.set("disabled",!1)},stop_recording:function(t){var e,o;for(s.mediaRecorder.stop(),e=t.getTracks(),o=0;o<e.length;o++)e[o].stop()},upload_to_server:function(d,i){var c=new window.XMLHttpRequest;c.open("GET",s.player.get("src"),!0),c.responseType="blob",c.onload=function(){var t,e,o,r,n,a;if(200===c.status){for(a=this.response,t=(1e3*Math.random()).toString().replace(".",""),t+="audio"===d?"-audio.ogg":"-video.webm",e=new window.FormData,o=s.editorScope.get("host").get("filepickeroptions").link,r=window.Object.keys(o.repositories),e.append("repo_upload_file",a,t),e.append("itemid",o.itemid),n=0;n<r.length;n++)if("upload"===o.repositories[r[n]].type){e.append("repo_id",o.repositories[r[n]].id);break}e.append("env",o.env),e.append("sesskey",M.cfg.sesskey),e.append("client_id",o.client_id),e.append("savepath","/"),e.append("ctx_id",o.context.id),a=M.cfg.wwwroot+"/repository/repository_ajax.php?action=upload",s.make_xmlhttprequest(a,e,function(t,e){"upload-ended"===t?i("ended",window.JSON.parse(e).url):i(t)})}},c.send()},make_xmlhttprequest:function(t,e,o){var r=new window.XMLHttpRequest;r.onreadystatechange=function(){4===r.readyState&&200===r.status?o("upload-ended",r.responseText):404===r.status&&o("upload-failed-404")},r.upload.onprogress=function(t){o(Math.round(t.loaded/t.total*100)+"% "+M.util.get_string("uploadprogress","atto_recordrtc"))},r.upload.onerror=function(t){o("upload-failed",t)},r.upload.onabort=function(t){o("upload-aborted",t)},r.open("POST",t),r.send(e)},pad:function(t){t+="";return t.length<2?"0"+t:t},set_time:function(){s.countdownSeconds--,s.startStopBtn.one("span#seconds").set("textContent",s.pad(s.countdownSeconds%60)),s.startStopBtn.one("span#minutes").set("textContent",s.pad(window.parseInt(s.countdownSeconds/60,10))),0===s.countdownSeconds&&s.startStopBtn.simulate("click")},create_annotation:function(t,e){return("audio"==t?"<audio controls='true'>":"<video controls='true'>")+("<source src='"+e+"'>"+e)+("audio"==t?"</audio>":"</video>")},insert_annotation:function(t,e){t=s.create_annotation(t,e);t?s.editorScope.setLink(s.editorScope,t):s.uploadBtn.set("textContent",M.util.get_string("attachrecording","atto_recordrtc"))}},M.atto_recordrtc=M.atto_recordrtc||{},s=M.atto_recordrtc.commonmodule,n=M.atto_recordrtc.abstractmodule,M.atto_recordrtc.compatcheckmodule={check_has_gum:function(){navigator.mediaDevices&&window.MediaRecorder||n.show_alert("nowebrtc",function(){s.editorScope.closeDialogue(s.editorScope)})},check_secure:function(){"https:"===window.location.protocol||-1!==window.location.host.indexOf("localhost")||s.alertDanger.ancestor().ancestor().removeClass("hide")}},M.atto_recordrtc=M.atto_recordrtc||{},s=M.atto_recordrtc.commonmodule,n=M.atto_recordrtc.abstractmodule,M.atto_recordrtc.abstractmodule={show_alert:function(e,o){r.use("moodle-core-notification-alert",function(){var t=new M.core.alert({title:M.util.get_string(e+"_title","atto_recordrtc"),message:M.util.get_string(e,"atto_recordrtc")});o&&t.after("complete",o)})},handle_gum_errors:function(t,e){var o=M.util.get_string("recordingfailed","atto_recordrtc"),r=function(){e.onMediaStopped(o)},t="gum"+t.name.replace("Error","").toLowerCase();"gumsecurity"!=t?n.show_alert(t,r):n.show_alert(t,function(){s.editorScope.closeDialogue(s.editorScope)})},
select_rec_options:function(t){var t="audio"===t?(e=["audio/webm;codecs=opus","audio/ogg;codecs=opus"],{audioBitsPerSecond:window.parseInt(s.editorScope.get("audiobitrate"))}):(e=["video/webm;codecs=vp9,opus","video/webm;codecs=h264,opus","video/webm;codecs=vp8,opus"],{audioBitsPerSecond:window.parseInt(s.editorScope.get("audiobitrate")),videoBitsPerSecond:window.parseInt(s.editorScope.get("videobitrate"))}),e=e.filter(function(t){return window.MediaRecorder.isTypeSupported(t)});return 0!==e.length&&(t.mimeType=e[0]),t}},M.atto_recordrtc=M.atto_recordrtc||{},s=M.atto_recordrtc.commonmodule,n=M.atto_recordrtc.abstractmodule,e=M.atto_recordrtc.compatcheckmodule,M.atto_recordrtc.audiomodule={init:function(t){s.editorScope=t,s.alertWarning=r.one("div#alert-warning"),s.alertDanger=r.one("div#alert-danger"),s.player=r.one("audio#player"),s.playerDOM=document.querySelector("audio#player"),s.startStopBtn=r.one("button#start-stop"),s.uploadBtn=r.one("button#upload"),s.recType="audio",s.maxUploadSize=t.get("maxrecsize"),e.check_has_gum(),e.check_secure(),s.startStopBtn.on("click",function(){var e;s.startStopBtn.set("disabled",!0),s.startStopBtn.get("textContent")===M.util.get_string("startrecording","atto_recordrtc")||s.startStopBtn.get("textContent")===M.util.get_string("recordagain","atto_recordrtc")||s.startStopBtn.get("textContent")===M.util.get_string("recordingfailed","atto_recordrtc")?(s.player.ancestor().ancestor().addClass("hide"),s.uploadBtn.ancestor().ancestor().addClass("hide"),s.startStopBtn.replaceClass("btn-outline-danger","btn-danger"),s.chunks=[],s.blobSize=0,s.uploadBtn.detach("click"),e={onMediaCaptured:function(t){s.stream=t,s.start_recording(s.recType,s.stream)},onMediaStopped:function(t){s.startStopBtn.set("textContent",t),s.startStopBtn.set("disabled",!1),s.startStopBtn.replaceClass("btn-danger","btn-outline-danger")},onMediaCapturingFailed:function(t){n.handle_gum_errors(t,e)}},M.atto_recordrtc.audiomodule.capture_audio(e)):(window.clearInterval(s.countdownTicker),window.setTimeout(function(){s.startStopBtn.set("disabled",!1)},1e3),s.stop_recording(s.stream),s.startStopBtn.set("textContent",M.util.get_string("recordagain","atto_recordrtc")),s.startStopBtn.replaceClass("btn-danger","btn-outline-danger")),s.editorScope.getDialogue().centered()})},capture_audio:function(e){s.capture_user_media({audio:!0},function(t){s.playerDOM.srcObject=t,e.onMediaCaptured(t)},function(t){e.onMediaCapturingFailed(t)})}},M.atto_recordrtc=M.atto_recordrtc||{},s=M.atto_recordrtc.commonmodule,n=M.atto_recordrtc.abstractmodule,e=M.atto_recordrtc.compatcheckmodule,M.atto_recordrtc.videomodule={init:function(t){s.editorScope=t,s.alertWarning=r.one("div#alert-warning"),s.alertDanger=r.one("div#alert-danger"),s.player=r.one("video#player"),s.playerDOM=document.querySelector("video#player"),s.startStopBtn=r.one("button#start-stop"),s.uploadBtn=r.one("button#upload"),s.recType="video",s.maxUploadSize=t.get("maxrecsize"),e.check_has_gum(),e.check_secure(),s.startStopBtn.on("click",function(){var e;s.startStopBtn.set("disabled",!0),s.startStopBtn.get("textContent")===M.util.get_string("startrecording","atto_recordrtc")||s.startStopBtn.get("textContent")===M.util.get_string("recordagain","atto_recordrtc")||s.startStopBtn.get("textContent")===M.util.get_string("recordingfailed","atto_recordrtc")?(s.uploadBtn.ancestor().ancestor().addClass("hide"),s.startStopBtn.replaceClass("btn-outline-danger","btn-danger"),s.chunks=[],s.blobSize=0,s.uploadBtn.detach("click"),e={onMediaCaptured:function(t){s.stream=t,s.start_recording(s.recType,s.stream)},onMediaStopped:function(t){s.startStopBtn.set("textContent",t),s.startStopBtn.set("disabled",!1),s.startStopBtn.replaceClass("btn-danger","btn-outline-danger")},onMediaCapturingFailed:function(t){n.handle_gum_errors(t,e)}},s.player.ancestor().ancestor().removeClass("hide"),s.player.set("controls",!1),M.atto_recordrtc.videomodule.capture_audio_video(e)):(window.clearInterval(s.countdownTicker),window.setTimeout(function(){s.startStopBtn.set("disabled",!1)},1e3),s.stop_recording(s.stream),s.startStopBtn.set("textContent",M.util.get_string("recordagain","atto_recordrtc")),s.startStopBtn.replaceClass("btn-danger","btn-outline-danger")),s.editorScope.getDialogue().centered()})},capture_audio_video:function(e){s.capture_user_media({audio:!0,video:{width:{ideal:640},height:{ideal:480}}},function(t){s.playerDOM.srcObject=t,s.playerDOM.play(),e.onMediaCaptured(t)},function(t){e.onMediaCapturingFailed(t)})}}},"@VERSION@",{requires:["moodle-atto_recordrtc-button"]});