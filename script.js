document.getElementById('currencyForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah reload halaman

    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    const resultContainer = document.querySelector('.result'); // Seleksi container hasil
    const resultElement = document.getElementById('result'); // Elemen untuk hasil konversi

    // Reset tampilan hasil
    resultContainer.style.display = 'none'; // Sembunyikan hasil sementara

    // Validasi input
    if (amount === '' || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    // URL API untuk mendapatkan nilai tukar mata uang
    const apiKey = '7a4d896bb1346f9c7b796eae'; // Gantikan dengan kunci API asli
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    // Mengambil data nilai tukar mata uang
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                const rate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount * rate).toFixed(5);

                // Menampilkan hasil konversi
                resultElement.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                resultContainer.style.display = 'block'; // Tampilkan elemen hasil
            } else {
                resultElement.innerText = 'Error fetching exchange rates';
                resultContainer.style.display = 'block'; // Tampilkan error
            }
        })
        .catch(error => {
            resultElement.innerText = 'Error fetching exchange rates';
            resultContainer.style.display = 'block'; // Tampilkan error
            console.error('Error:', error);
        });
});
