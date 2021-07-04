let packetInput = document.getElementById('packet');
let travellerPacket = document.getElementById('travellerPacket');
let explorerPacket = document.getElementById('explorerPacket');
let adventurerPacket = document.getElementById('adventurerPacket');

travellerPacket.addEventListener("click", function() {
    packetInput.value = "Traveller";
    packetInput.readonly = true
});

explorerPacket.addEventListener("click", function() {
    packetInput.value = "Explorer";
    packetInput.readonly = true
});

adventurerPacket.addEventListener("click", function() {
    packetInput.value = "Adventurer";
    packetInput.readonly = true
});