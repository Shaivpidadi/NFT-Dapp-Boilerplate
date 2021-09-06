import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";

import { useColorContract } from "../../hooks";

const DummyNFT = () => {
  const [mintedColors, setMintedColors] = useState([]);
  const [color, setColor] = useState("");

  const { account } = useWeb3React();
  const colorContract = useColorContract();

  const onMintClick = () => {
    colorContract.methods
      .mint(color)
      .send({
        from: account,
      })
      .on("transactionHash", (receipt) => {
        console.log({ receipt });
      });
    setColor("");
  };

  useEffect(() => {
    const loadColors = async () => {
      if (!colorContract) {
        return;
      }
      const totalSupply = await colorContract.methods
        .totalSupply()
        .call({ from: account });

      // Load Colors
      for (var i = 1; i <= totalSupply; i++) {
        const color = await colorContract.methods.colors(i - 1).call();
        setMintedColors((oldState) => [...oldState, color]);
      }
    };

    loadColors();
  }, [colorContract, account]);

  console.log({ mintedColors });
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 d-flex text-center">
          <div className="content mr-auto ml-auto">
            <h1>Issue Token</h1>
            <input
              type="text"
              value={color}
              className="form-control mb-1"
              placeholder="e.g. #FFFFFF"
              onChange={(event) => setColor(event.target.value)}
            />
            <Button
              variant="outline-primary"
              disabled={!color}
              onClick={onMintClick}
            >
              MINT
            </Button>
          </div>
        </main>
      </div>
      <hr />
      <div className="container text-center">
        {mintedColors
          ? mintedColors.map((color, key) => {
              return (
                <div
                  key={key}
                  className="token"
                  style={{ backgroundColor: color }}
                >
                  <div>{color}</div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default DummyNFT;
