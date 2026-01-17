const request = require('supertest');
const app = require('./index');

describe('URL Shortener API', () => {
    let slug;
    const testUrl = 'https://example.com';

    it('should shorten a URL', async () => {
        const res = await request(app)
            .post('/shorten')
            .send({ url: testUrl });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('slug');
        expect(res.body).toHaveProperty('url', testUrl);
        
        slug = res.body.slug;
    });

    it('should retrieve the original URL', async () => {
        const res = await request(app)
            .get(`/url/${slug}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('slug', slug);
        expect(res.body).toHaveProperty('url', testUrl);
    });

    it('should return 404 for non-existent slug', async () => {
        const res = await request(app)
            .get('/url/nonexistent');
        
        expect(res.statusCode).toEqual(404);
    });

    it('should return 400 if URL is missing', async () => {
        const res = await request(app)
            .post('/shorten')
            .send({});
        
        expect(res.statusCode).toEqual(400);
    });
});
