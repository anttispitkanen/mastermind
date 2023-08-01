import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  background-color: #f6f6f7;
  font-size: 0.8rem;
`;

const FooterLinkContainer = styled.div`
  padding: 1rem;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinkContainer>
        By{' '}
        <a
          href="https://github.com/anttispitkanen"
          target="_blank"
          rel="noreferrer noopener"
        >
          @anttispitkanen
        </a>
      </FooterLinkContainer>
      <FooterLinkContainer>
        <a
          href="https://github.com/anttispitkanen/mastermind"
          target="_blank"
          rel="noreferrer noopener"
        >
          Source code on GitHub
        </a>
      </FooterLinkContainer>
    </FooterContainer>
  );
};
