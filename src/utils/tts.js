const AZURE_KEY = import.meta.env.VITE_AZURE_KEY;
const AZURE_REGION = 'eastus'; // keep your original region

export async function playTTS(text, voiceName = 'en-GB-LibbyNeural') {
  try {
    const response = await fetch(`https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
        'Ocp-Apim-Subscription-Key': AZURE_KEY,
      },
      body: `
        <speak version='1.0' xml:lang='en-US'>
          <voice name='${voiceName}'>
            ${text}
          </voice>
        </speak>`
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Azure TTS error:', response.status, errorText);
      alert(`TTS error: ${response.status}`);
      return;
    }

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play().catch(err => {
      console.error('🔇 Audio play error:', err);
      alert('Audio failed to play: ' + err.message);
    });
  } catch (err) {
    console.error('❗ TTS fetch failed:', err);
    alert('TTS request failed: ' + err.message);
  }
}