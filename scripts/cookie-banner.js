(function () {
    // LocalStorage Key
    const localStorageKey = 'cookiePreferences';

    // Helper Functions
    function hideBanner(cookieBanner) {
        cookieBanner.style.display = 'none';
    }

    function showCookieSettingsModal(cookieSettingsModal) {
        cookieSettingsModal.style.display = 'block';
    }

    function hideCookieSettingsModal(cookieSettingsModal) {
        cookieSettingsModal.style.display = 'none';
    }

    function getCookiePreferences() {
        const preferences = localStorage.getItem(localStorageKey);
        return preferences ? JSON.parse(preferences) : null;
    }

    function setCookiePreferences(preferences) {
        localStorage.setItem(localStorageKey, JSON.stringify(preferences));
    }

    function applyCookiePreferences(preferences, performanceCookiesCheckbox, functionalCookiesCheckbox, targetingCookiesCheckbox) {
        if (preferences) {
            performanceCookiesCheckbox.checked = preferences.performance;
            functionalCookiesCheckbox.checked = preferences.functional;
            targetingCookiesCheckbox.checked = preferences.targeting;
        }
    }

    function setAllCookies() {
        const preferences = {
            performance: true,
            functional: true,
            targeting: true,
        };
        setCookiePreferences(preferences);
        try {
            acceptCookies();
        } catch (err) {
            console.log(err)
        }
        // Here you would set the actual cookies
        // Example: document.cookie = "cookieName=cookieValue; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    }

    function rejectAllNonEssentialCookies() {
        const preferences = {
            performance: false,
            functional: false,
            targeting: false,
        };
        setCookiePreferences(preferences);
        try {
            rejectGtagCookies()
        } catch (err) {
            console.log(err)
        }
        // Here you would delete the non-essential cookies
        // Example: document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }

    function saveCookieSettings(performanceCookiesCheckbox, functionalCookiesCheckbox, targetingCookiesCheckbox) {
        const preferences = {
            performance: performanceCookiesCheckbox.checked,
            functional: functionalCookiesCheckbox.checked,
            targeting: targetingCookiesCheckbox.checked,
        };
        setCookiePreferences(preferences);
        // Here you would set or delete the actual cookies based on the preferences
        // Example: document.cookie = "cookieName=cookieValue; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    }

    function createCookieBanner() {
        // Create elements
        const cookieBanner = document.createElement('div');
        cookieBanner.id = 'cookie-banner';
        cookieBanner.className = 'cookieContainer';
        const bannerText = document.createElement('div');
        bannerText.className = 'cookie-text';
        bannerText.innerHTML = `
            <div class="cookie-header">
                <img src="./assets/general/cookie.svg">
                <h1>Cookies Settings</h1>
            </div>
            <h3>We use cookies, check our Cookie Policy for more info.</h3>
           
        `;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'cookie-buttons';

        const acceptAllButton = document.createElement('button');
        acceptAllButton.id = 'accept-all-cookies';
        acceptAllButton.textContent = 'Accept';
        acceptAllButton.className = 'cookie-button';

        const customizeButton = document.createElement('button');
        customizeButton.id = 'customize-cookies';
        customizeButton.textContent = 'Customize';
        customizeButton.className = 'cookie-button blue';

        const rejectAllButton = document.createElement('button');
        rejectAllButton.id = 'reject-all-cookies';
        rejectAllButton.textContent = 'Reject';
        rejectAllButton.className = 'cookie-button red';

        // Append elements
      
        // buttonsDiv.appendChild(customizeButton);
        buttonsDiv.appendChild(rejectAllButton);
        buttonsDiv.appendChild(acceptAllButton);
        cookieBanner.appendChild(bannerText);
        cookieBanner.appendChild(buttonsDiv);

        // Create modal
        const cookieSettingsModal = document.createElement('div');
        cookieSettingsModal.id = 'cookie-settings-modal';
        cookieSettingsModal.className = 'cookie-settings-modal';

        cookieSettingsModal.innerHTML = `
            <h3>Cookie Settings</h3>
            <p>Choose which types of cookies you want to allow.</p>

            <div>
                <input type="checkbox" id="necessary-cookies" name="necessary-cookies" checked disabled>
                <label for="necessary-cookies">Strictly Necessary Cookies</label>
                <p>These cookies are essential for the website to function properly. They cannot be disabled.</p>
            </div>

            <div>
                <input type="checkbox" id="performance-cookies" name="performance-cookies">
                <label for="performance-cookies">Performance Cookies</label>
                <p>These cookies collect information about how you use our website, like which pages you visit. This helps us improve our website.</p>
            </div>

            <div>
                <input type="checkbox" id="functional-cookies" name="functional-cookies">
                <label for="functional-cookies">Functional Cookies</label>
                <p>These cookies allow the website to remember choices you make (such as your language) and provide enhanced features.</p>
            </div>

            <div>
                <input type="checkbox" id="targeting-cookies" name="targeting-cookies">
                <label for="targeting-cookies">Targeting/Advertising Cookies</label>
                <p>These cookies are used to deliver ads that are more relevant to you and your interests.</p>
            </div>

            <div style="margin-top: 10px;">
                <button id="save-cookie-settings" class="cookie-button">Save Settings</button>
                <button id="close-cookie-settings" class="cookie-button red">Close</button>
            </div>
        `;

        // Append to body
        document.body.appendChild(cookieBanner);
        document.body.appendChild(cookieSettingsModal);

        // Add css
        const style = document.createElement('style');
        document.head.appendChild(style);

        // Get elements
        const performanceCookiesCheckbox = document.getElementById('performance-cookies');
        const functionalCookiesCheckbox = document.getElementById('functional-cookies');
        const targetingCookiesCheckbox = document.getElementById('targeting-cookies');
        const saveSettingsButton = document.getElementById('save-cookie-settings');
        const closeSettingsButton = document.getElementById('close-cookie-settings');

        // Event Listeners
        acceptAllButton.addEventListener('click', () => {
            setAllCookies();
            hideBanner(cookieBanner);
        });

        customizeButton.addEventListener('click', () => {
            showCookieSettingsModal(cookieSettingsModal);
        });

        rejectAllButton.addEventListener('click', () => {
            rejectAllNonEssentialCookies();
            hideBanner(cookieBanner);
        });

        saveSettingsButton.addEventListener('click', () => {
            saveCookieSettings(performanceCookiesCheckbox, functionalCookiesCheckbox, targetingCookiesCheckbox);
            hideCookieSettingsModal(cookieSettingsModal);
            hideBanner(cookieBanner);
        });

        closeSettingsButton.addEventListener('click', () => {
            hideCookieSettingsModal(cookieSettingsModal);
        });

        // Initialize
        const preferences = getCookiePreferences();
        if (preferences) {
            applyCookiePreferences(preferences, performanceCookiesCheckbox, functionalCookiesCheckbox, targetingCookiesCheckbox);
            hideBanner(cookieBanner);
        } else {
            cookieBanner.style.display = 'block';
        }
    }

    // Call the function to create the banner
    window.addEventListener('DOMContentLoaded', createCookieBanner);
})();
