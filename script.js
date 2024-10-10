function pokeSearch(event) {
    event.preventDefault();
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    
    pokeEntry = document.getElementById('pokeInput').value.trim().toLowerCase();
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeEntry}`)
    
    .then(res => {
        if(!res.ok) {
            throw new Error("Cant find that Pokemon! Try Again!");
        }
        return res.json();
    })
    .then(data => {
        let pokeName = capitalizeFirstLetter(data.name);
        let pokeType = data.types
        .map(typeInfo => capitalizeFirstLetter(typeInfo.type.name))
        .join(" / ");
        let pokeImg = data.sprites.front_default;
        let pokeSound = data.cries.latest;
        let pokeAbilities = data.abilities
        .map(abilityInfo => capitalizeFirstLetter(abilityInfo.ability.name))
        .join(", ");
        let pokeWeight = data.weight;
    
        document.getElementById('pokeName').textContent = pokeName;
        document.getElementById('pokeType').textContent = pokeType;
        document.getElementById('pokeImg').src = pokeImg;
        document.getElementById('pokeAbilities').textContent = `Abilities: ${pokeAbilities}`;
        document.getElementById('pokeWeight').textContent = `Weight: ${pokeWeight}`;
    
        let audio = new Audio(pokeSound);
        audio.play();
    })
    .catch(err => {
        console.error('Error!', err);
    })
    
    
    }