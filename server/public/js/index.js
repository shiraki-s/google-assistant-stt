$(function() {

    $('#record').click(function() {

        if ($('#record').text() == '録音開始') {

            $('#record').text('録音中');
            startMeeting(5);
        }
    });

    //second秒毎に録音した内容をサーバーに送信する
    function startMeeting(second) {

        //録音内容を削除する
        clearRecording();
        //録音を開始する
        startRecording();

        setTimeout(() => {

            //録音を停止する
            stopRecording();
            $('#record').text('録音開始');
            
            //録音された音声ファイルを取得する
            getWav(function(wav) {

                //音声ファイルを非同期に送信する
                sendWav(wav, '/stt').then(
                    (data, textStatus, jqXHR) => {
                        $('#result').text(data);
                    },
                    (jqXHR, textStatus, errorThrown) => {
                        console.log('fail');
                    }
                )

            });

        }, second * 1000);
    }

    window.onload = function() {

        //マイクの使用許可等、録音の準備を行う
        initRecoder();
    };
});