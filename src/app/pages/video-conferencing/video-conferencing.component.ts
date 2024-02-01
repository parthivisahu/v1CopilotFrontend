import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-conferencing',
  templateUrl: './video-conferencing.component.html',
  styleUrls: ['./video-conferencing.component.scss']
})
export class VideoConferencingComponent implements OnInit {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  constructor(private clipboard: Clipboard, private router: Router) { }
  cameraOn = true;
micOn = true;
isMicrophoneOn = true;
  localStream!: MediaStream;
  remoteStream!: MediaStream;
  peerConnection!: RTCPeerConnection;
  peerId!: string;
  meetId = Math.random().toString(36).substring(2);
  currentTime = new Date();

  copyMeetId() {
    this.clipboard.copy(this.meetId);
  }

  shareMeetId() {
    if (navigator.share) {
      navigator.share({
        title: 'Meet ID',
        text: this.meetId,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Your system does not support sharing');
    }
  }

  toggleMic() {
    this.localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
    this.micOn = !this.micOn;
  }
  
  toggleCamera() {
    this.localStream.getVideoTracks().forEach(track => {
      track.enabled = this.cameraOn;
    });
    this.cameraOn = !this.cameraOn;
  }

  async ngOnInit() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localVideo.nativeElement.srcObject = this.localStream;

    this.peerConnection = new RTCPeerConnection();
    this.peerConnection.ontrack = event => {
      this.remoteStream = event.streams[0];
      this.remoteVideo.nativeElement.srcObject = this.remoteStream;
      this.peerId = Math.random().toString(36).substring(2);

      setInterval(() => {
        this.currentTime = new Date();
      }, 1000);
    };

    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    // Generate a random peer ID
    this.peerId = Math.random().toString(36).substring(2);
  }

  async startCall() {
    const offer = await this.peerConnection.createOffer();
    this.peerConnection.setLocalDescription(offer);
    this.cameraOn = true;
    // Here you would send the offer and the peer ID to the other peer using your signaling server
  }

  async endCall() {
    this.peerConnection.close();
    this.localStream.getTracks().forEach(track => track.stop());
    this.router.navigate(['/home']);
  }

  async shareScreen() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    screenStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, screenStream);
    });
  }


  
  
}
