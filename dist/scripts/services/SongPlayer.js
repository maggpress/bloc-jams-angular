(function() {
    function SongPlayer($rootScope, Fixtures) {
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
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
      SongPlayer.currentTime = null;
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
            SongPlayer.currentSong.playing = null;
    }
 
        currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
    });
         
         currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
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
@function songPlayer next
@desc plays the next song
@param {Object} song
 */
       SongPlayer.next = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex++;
    
     var lastSongIndex = currentAlbum.songs.length - 1;
         
         if (currentSongIndex > lastSongIndex) {
         stopSong(SongPlayer.currentSong);
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };  
        /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
      SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
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
         
      /*
      * @function setVolume
      * @desc sets the volume
      @ param value of volume level
      */
      
      SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };
      
       return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();