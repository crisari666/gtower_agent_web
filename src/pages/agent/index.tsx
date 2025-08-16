// src/PipecatWebRTC.tsx
import React, { useEffect, useRef, useState } from 'react'

export default function AgentView() {
  const [status, setStatus] = useState('Disconnected')
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null)

  async function startCall() {
    setStatus('Connecting...')
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    })
    pcRef.current = pc

    // Play incoming audio
    const remoteAudio = new Audio()
    remoteAudio.autoplay = true
    remoteAudioRef.current = remoteAudio
    pc.ontrack = (event) => {
      console.log('Remote track received')
      remoteAudio.srcObject = event.streams[0]
    }

    // Add mic audio to connection
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach((track) => pc.addTrack(track, stream))

    // Gather ICE candidates
    const iceCandidates: RTCIceCandidateInit[] = []
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        iceCandidates.push(event.candidate.toJSON())
      }
    }

    // Create offer
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)

    // Send offer to Pipecat signaling server
    const res = await fetch('https://your-pipecat-server.com/webrtc-offer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sdp: offer.sdp,
        type: offer.type,
      }),
    })
    const answer = await res.json()

    // Apply answer
    await pc.setRemoteDescription(answer)

    setStatus('Connected')
  }

  function stopCall() {
    pcRef.current?.close()
    setStatus('Disconnected')
  }

  return (
    <div>
      <h1>Pipecat WebRTC Test</h1>
      <p>Status: {status}</p>
      <button onClick={startCall}>Start Call</button>
      <button onClick={stopCall}>Stop Call</button>
    </div>
  )
}
