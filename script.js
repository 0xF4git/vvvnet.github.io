document.getElementById('signUp').addEventListener('click', function(){
    document.querySelector('.container').classList.add('right-panel-active');
});

document.getElementById('signIn').addEventListener('click', function(){
    document.querySelector('.container').classList.remove('right-panel-active');
});

document.getElementById('login-form').addEventListener('submit', function(event){
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    // Here you would perform validation and check credentials against JSON file
});

document.getElementById('register-form').addEventListener('submit', function(event){
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    // Here you would perform registration and store credentials in JSON file
});
