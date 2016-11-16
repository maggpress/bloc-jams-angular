(function() {
     function SongPlayer(Fixtures) {
      var SongPlayer = {};
 /**
 * @function current album
 * @desc gets current album to Song player
 * @type {Object} 
 */
      var currentAlbum = Fixtures.getAlbum();
       /**
 * @function get song index
 * @desc gets index of song array
 * @type {Object} 
 */
       var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };

/**
* @desc Active song object from list of songs
* @type {Object}
*/
       
      SongPlayer.currentSong = null;
/**
 * @desc Buzz object audio file
 * @type {Object}
 */
       var currentBuzzObject = null;
       
/**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
       var setSong = function(song) {
          if (currentBuzzObject) {
            currentBuzzObject.stop();
            SongPlayer.SongPlayer.currentSong.playing = null;
    }
 
        currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
    });
 
        SongPlayer.currentSong = song;
 };
       
       SongPlayer.play = function(song) {
         song = song || SongPlayer.currentSong;
         if (SongPlayer.currentSong !== song) {
            setSong(song);
            currentBuzzObject.play();
            song.playing = true;
          } else if (SongPlayer.currentSong === song) {
              if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
         }
     }
 };
       
       SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
 };

/*
@function songPlayer previous
@desc plays the previous song
@param {Object} song
 */
       SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
         if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };
       
/*
@function playSong
@desc Plays a song
@param {Object} song
 */

       playSong = function(song) {
          currentBuzzObject.play()
          song.playing = true;
       };
          
       return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();