const transport = {
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'bargigshop@gmail.com',
        pass: 'bargig123456',
    },
    tls: { rejectUnauthorized: false }
}

exports.transport = transport