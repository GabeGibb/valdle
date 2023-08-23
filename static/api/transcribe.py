import speech_recognition as sr
import requests
r = sr.Recognizer()

link = "https://media.valorant-api.com/sounds/1249607464.wav"
resp = requests.get(link, stream=True)

# open the file
with sr.AudioFile(resp.raw) as source:
    # listen for the data (load audio to memory)
    audio_data = r.record(source)
    # recognize (convert from speech to text)
    text = r.recognize_google(audio_data, language="es-ES")
    print(text)





# import speech_recognition as sr
# import requests
# from scipy.io import wavfile
# import noisereduce as nr
# # load data
# link = "https://media.valorant-api.com/sounds/57017951.wav"
# resp = requests.get(link, stream=True)
# rate, data = wavfile.read("57017951.wav")
# # perform noise reduction
# reduced_noise = nr.reduce_noise(y=data, sr=rate)
# wavfile.write("mywav_reduced_noise.wav", rate, reduced_noise)