document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('timezone-select');
    const displayElement = document.getElementById('selected-timezone-display');

    // Get the user's current time zone and pre-select it
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Function to populate the dropdown
    function populateTimezones() {
        // Use a list of common time zones to avoid overwhelming the user.
        // Full list from Intl.supportedValuesOf('timeZone') can be very long.
        const commonTimeZones = [
            'Pacific/Midway', 'Pacific/Honolulu', 'America/Anchorage', 'America/Los_Angeles',
            'America/Denver', 'America/Chicago', 'America/New_York', 'America/Halifax',
            'America/Argentina/Buenos_Aires', 'Atlantic/Cape_Verde', 'Atlantic/Azores',
            'Europe/London', 'Europe/Berlin', 'Europe/Helsinki', 'Europe/Moscow',
            'Asia/Dubai', 'Asia/Kabul', 'Asia/Karachi', 'Asia/Kolkata', 'Asia/Kathmandu',
            'Asia/Dhaka', 'Asia/Bangkok', 'Asia/Shanghai', 'Asia/Tokyo', 'Australia/Darwin',
            'Australia/Sydney', 'Pacific/Guadalcanal', 'Pacific/Auckland', 'Pacific/Tongatapu'
        ];

        // Format and sort the time zones
        const timeZoneOptions = commonTimeZones.map(tz => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: tz,
                timeZoneName: 'longOffset'
            });
            const formattedOffset = formatter.format(now).split(' ')[1];
            return {
                value: tz,
                label: `(${formattedOffset}) ${tz.replace(/_/g, ' ')}`
            };
        }).sort((a, b) => {
            // Sort primarily by UTC offset, then alphabetically
            const offsetA = parseInt(a.label.match(/GMT([+-]\d+)/)?.[1] || 0);
            const offsetB = parseInt(b.label.match(/GMT([+-]\d+)/)?.[1] || 0);
            return offsetA - offsetB || a.label.localeCompare(b.label);
        });

        // Add options to the select element
        timeZoneOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            selectElement.appendChild(optionElement);
        });

        // Set the default selected value to the user's detected time zone
        selectElement.value = userTimeZone;
        updateDisplay(userTimeZone);
    }

    // Update the display text when a new time zone is selected
    function updateDisplay(timezone) {
        displayElement.textContent = timezone;
    }

    // Event listener for when the user changes the selection
    selectElement.addEventListener('change', (event) => {
        updateDisplay(event.target.value);
    });

    // Initialize the page
    populateTimezones();
});
