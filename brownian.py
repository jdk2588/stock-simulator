import numpy
#from pylab import plot, show, grid, xlabel, ylabel

from math import sqrt
from scipy.stats import norm
import numpy as np


def brownian(x0, n, dt, delta, out=None):

    x0 = np.asarray(x0)

    # For each element of x0, generate a sample of n numbers from a
    # normal distribution.
    r = norm.rvs(size=x0.shape + (n,), scale=delta*sqrt(dt))

    # If `out` was not given, create an output array.
    if out is None:
        out = np.empty(r.shape)

    # This computes the Brownian motion by forming the cumulative sum of
    # the random samples.
    np.cumsum(r, axis=-1, out=out)

    # Add the initial condition.
    out += np.expand_dims(x0, axis=-1)

    return out

def return_data():

    # The Wiener process parameter.
    delta = 2
    # Total time.
    T = 10.0
    # Number of steps.
    N = 100
    # Time step size
    dt = T/N
    # Number of realizations to generate.
    m = 3
    # Create an empty array to store the realizations.
    x = numpy.empty((m,N+1))
    # Initial values of x.
    x[:, 0] = 50

    out = brownian(x[:,0], N, dt, delta, out=x[:,1:])
    out = out.tolist()

    out_dict = [{"name":"google"}, {"name":"facebook"}, {"name":"twitter"}]

    for index, value in enumerate(out_dict):
        value["values"] = out[index]
        out_dict[index] = value

    return out_dict
    #t = numpy.linspace(0.0, N*dt, N+1)
    #for k in range(m):
    #    plot(t, x[k])
    #xlabel('t', fontsize=16)
    #ylabel('x', fontsize=16)
    #grid(True)
    #show()
