import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MaxLength(50)
  @MinLength(6)
  name: string;

  @IsString()
  @MaxLength(200)
  @MinLength(10)
  description: string;

  @IsString()
  @IsUrl(undefined, {
    message: 'Repository URL must be a valid URL',
  })
  @MaxLength(100)
  repository: string;
}
