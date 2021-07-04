let packetInput = document.getElementById('packet');
let travellerPacket = document.getElementById('travellerPacket');
let explorerPacket = document.getElementById('explorerPacket');
let adventurerPacket = document.getElementById('adventurerPacket');

travellerPacket.addEventListener("click", function() {
    packetInput.value = "Traveller";
});

explorerPacket.addEventListener("click", function() {
    packetInput.value = "Explorer";
});

adventurerPacket.addEventListener("click", function() {
    packetInput.value = "Adventurer";
});