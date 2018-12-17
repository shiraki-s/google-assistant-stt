FROM debian:stretch

RUN cd && \
    apt-get update && \
    apt-get install -yq python3-dev python3-venv git curl wget ffmpeg && \
    echo export LC_ALL=C.UTF-8 >>  .bashrc && \
    echo export LANG=C.UTF-8 >>  .bashrc && \
    echo source ~/.nvm/nvm.sh >> .bashrc && \
    git clone https://github.com/creationix/nvm.git ~/.nvm && \
    git clone https://github.com/googlesamples/assistant-sdk-python.git && \
    git clone https://github.com/shiraki-s/google-assistant-stt.git && \
    mkdir app && \
    cp google-assistant-stt/pushtalk.py app && \
    cp -r google-assistant-stt/server/* app && \
    cp assistant-sdk-python/google-assistant-sdk/googlesamples/assistant/grpc/assistant_helpers.py app && \
    cp assistant-sdk-python/google-assistant-sdk/googlesamples/assistant/grpc/audio_helpers.py app && \
    cp assistant-sdk-python/google-assistant-sdk/googlesamples/assistant/grpc/device_helpers.py app && \
    cp assistant-sdk-python/google-assistant-sdk/googlesamples/assistant/grpc/browser_helpers.py app

RUN ["/bin/bash", "-c", " \
        source ~/.nvm/nvm.sh \
        && nvm install 8.9.4 \
        && cd \
        && python3 -m venv env \
        && env/bin/python -m pip install --upgrade pip setuptools wheel \
        && source env/bin/activate \
        && apt-get install -yq portaudio19-dev libffi-dev libssl-dev libmpg123-dev \
        && python -m pip install --upgrade google-assistant-library google-assistant-sdk[samples] \
        && cd app \
        && npm install \
    "]
