(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum(); // Add an albumData property that holds a copy of albumPicasso.
        this.songPlayer = SongPlayer;
    };

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();



Use ngRepeat on the album-view-song-item table row to add a song row for each song on the album. Replace the static song information with the song data using the corresponding scope properties and {{ }} markup:
number (Refer to the table of "exposed properties" in the ngRepeat documentation)
name
length (You'll filter the time code in a later checkpoint)
In the Album template, replace the static album information with the album data using {{ }} markup:
album art
name
artist
year and record label