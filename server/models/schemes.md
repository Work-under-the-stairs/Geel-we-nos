news{
    title: String,
    content: String,
    writer: String,
    date: Date,
    images: [String],
    videos: [String],
    category: String,
    important_rate: Number,
    comments: [Comment]
}

comment{
    content: String,
    writer: String,
    date: Date,
    replies: [Comment]
}

user{
    username: String,
    password: String,
    email: String,
    name: String,
    avatar: String,
    registration_date: Date
}

category{
    name: String,
    news: [News]
}