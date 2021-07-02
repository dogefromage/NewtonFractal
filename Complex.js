class Complex
{
    constructor(r, i)
    {
        this.r = r;
        this.i = i;
    }

    magSqr()
    {
        return this.r * this.r + this.i * this.i;
    }

    mag()
    {
        return Math.sqrt(this.magSqr())
    }

    arg()
    {
        return Math.atan2(this.i, this.r);
    }

    square()
    {
        return new Complex(
            this.r * this.r - this.i * this.i,
            this.r * this.i * 2);
    }

    mult(z)
    {
        return new Complex(
            this.r * z.r - this.i * z.i,
            this.r * z.i + this.i * z.r);
    }

    multScalar(t)
    {
        return new Complex(t * this.r, t * this.i);
    }

    div(z)
    {
        return new Complex(
            this.r * z.r + this.i * z.i,
            this.i * z.r - this.r * z.i
        ).multScalar( 1 / (z.r * z.r + z.i * z.i) );
    }

    add(z)
    {
        return new Complex(this.r + z.r, this.i + z.i);
    }

    sub(z)
    {
        return new Complex(this.r - z.r, this.i - z.i);
    }

    pow(n)
    {
        let z = this.add(new Complex(0, 0));
        for (let i = 0; i < n - 1; i++)
        {
            z = z.mult(this);
        }
        return z;
    }

    print()
    {
        console.log(`re(z)=${this.r} im(z)=${this.i}`)
    }
}